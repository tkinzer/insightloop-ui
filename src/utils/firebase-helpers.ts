import {
  collection,
  doc,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getDocFromCache,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from 'firebase/firestore';

export async function getDocument(firestore: Firestore, collectionRef: string) {
  const docRef = doc(firestore, 'cities', 'SF');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

export async function getDocumentFromCache(firestore: Firestore, collectionRef: string) {
  const docRef = doc(firestore, 'cities', 'SF');

  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
    const doc = await getDocFromCache(docRef);

    // Document was found in the cache. If no cached document exists,
    // an error will be returned to the 'catch' block below.
    console.log('Cached document data:', doc.data());
  } catch (e) {
    console.log('Error getting cached document:', e);
  }
}

class Insight {
  name: string;
  state: string;
  country: string;

  constructor(name: string, state: string, country: string) {
    this.name = name;
    this.state = state;
    this.country = country;
  }

  toString() {
    return this.name + ', ' + this.state + ', ' + this.country;
  }
}

// Firestore data converter
const converter = {
  toFirestore: (insight: Insight): DocumentData => {
    return {
      name: insight.name,
      state: insight.state,
      country: insight.country,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: any): Insight => {
    const data = snapshot.data(options);
    return new Insight(data.name, data.state, data.country);
  },
};

export async function getCustomDocument(
  firestore: Firestore,
  collectionRef: string,
  converter: FirestoreDataConverter<any>
) {
  const ref = doc(firestore, 'cities', 'LA').withConverter(converter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to City object
    const city = docSnap.data();
    // Use a City instance method
    console.log(city.toString());
  } else {
    console.log('No such document!');
  }
}

// TODO: add where statement as a prop
export async function getMultipleDocuments(firestore: Firestore, collectionRef: string) {
  const q = query(collection(firestore, 'cities'), where('capital', '==', true));

  // TODO: use Insight converter
  const documents = new Map<string, DocumentData>();
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    documents.set(doc.id, doc.data());
  });
}

export async function getAllDocuments(firestore: Firestore, collectionRef: string) {
  const q = query(collection(firestore, 'cities'), where('capital', '==', true));

  // TODO: use Insight converter
  const documents = new Map<string, DocumentData>();
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    documents.set(doc.id, doc.data());
  });
}

export async function loadDefaultData(firestore: Firestore) {
  const citiesRef = collection(firestore, 'cities');

  await setDoc(doc(citiesRef, 'SF'), {
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 860000,
    regions: ['west_coast', 'norcal'],
  });
  await setDoc(doc(citiesRef, 'LA'), {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 3900000,
    regions: ['west_coast', 'socal'],
  });
  await setDoc(doc(citiesRef, 'DC'), {
    name: 'Washington, D.C.',
    state: null,
    country: 'USA',
    capital: true,
    population: 680000,
    regions: ['east_coast'],
  });
  await setDoc(doc(citiesRef, 'TOK'), {
    name: 'Tokyo',
    state: null,
    country: 'Japan',
    capital: true,
    population: 9000000,
    regions: ['kanto', 'honshu'],
  });
  await setDoc(doc(citiesRef, 'BJ'), {
    name: 'Beijing',
    state: null,
    country: 'China',
    capital: true,
    population: 21500000,
    regions: ['jingjinji', 'hebei'],
  });
}
