import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { ReactNode, useEffect, useState } from 'react';
import { useFirebaseContext } from '~/components/context/FirebaseContext';

interface InsightProps {
  text: string;
  id: string;
}

type InsightContext = {
  insights: InsightProps[];
  addInsight: (text: string) => void;
  refreshInsights: () => void;
};

export const insightContext = React.createContext<InsightContext>({
  insights: [] as InsightProps[],
  addInsight: () => {},
  refreshInsights: () => {},
});

export function InsightsProvider(props: { children: ReactNode }) {
  const { children } = props;
  // FIX: remove any
  const [entries, setEntries] = useState<InsightProps[] | any | null>(null);
  const [loading, setLoading] = useState(false);
  // FIX: change default query to use uid and collection
  const [defaultQuery, setDefaultQuery] = useState<string>('users/PTvz4bNu9VuFeKE0DkYV/insights');
  const { firestore } = useFirebaseContext();

  function createEntry(title: string, entry: string) {
    console.log('create entry pipe', title, entry);
    if (!firestore) {
      console.debug('firestore is not ready');
      return;
    }
    const newEntry = {
      title: title ?? '',
      entry: entry,
      content: entry,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLoading(true);
    /**
        * // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "cities"), {
          name: "Tokyo",
          country: "Japan"
        });
        console.log("Document written with ID: ", docRef.id);
        // Add a new document with a manually specified id.
        await setDoc(doc(db, "cities", "new-city-id"), data);
     */
    addDoc(collection(firestore, defaultQuery), newEntry)
      .then((docRef) => {
        console.log('createEntry', docRef);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  function refresh() {
    setLoading(true);
    if (!firestore) {
      console.error('No firestore');
      return;
    }
    try {
      // FIX: add user.uid to path
      const journalCollection = collection(firestore, defaultQuery);
      getDocs(journalCollection).then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        const data = querySnapshot.docs.map((doc) => {
          console.log('doc', doc);
          return doc.data();
        });
        console.log('data', data);
        setEntries(data);
        setLoading(false);
      });
    } catch (error: any) {
      console.debug('error refreshing the journal', error);
      setLoading(false);
    }
  }

  const value = {
    entries,
    loading,
    createEntry,
    refresh,
  };

  // return <insightContext.Provider value={value}>{children}</insightContext.Provider>;
  return;
}

/**
 * Data hook for insights.
 */
export default function useInsights() {
  const { insights } = React.useContext(insightContext);

  useEffect(() => {
    insights.forEach((insight) => {
      console.log(insight);
    });
  }, [insights]);

  return {
    insights,
  };
}
