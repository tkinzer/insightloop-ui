import React from 'react';

const people = [
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  // More people...
];
const activityItems = [
  { id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  // More items...
];

type Item = {
  id: number;
  entryText?: string;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface StackedListProps {
  items: Item[];
  renderItem?: (item: Item) => React.ReactNode;
}

export default function StackedList(props: StackedListProps) {
  const [itemsToRender, setItemsToRender] = React.useState(props.items);

  const renderItem = (item: Item) => {
    return (
      <div>
        <h1>{item.id}</h1>
      </div>
    );
  };

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {itemsToRender.map((item) => (
          <li key={item.id} className="py-4">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src={'https://robohash.org/' + Math.random()} alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{item.id}</h3>
                  <p className="text-sm text-gray-500">{item.id}</p>
                </div>
                <p className="text-sm text-gray-500">{item.entryText || item.title || item.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
