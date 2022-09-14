import React from 'react';

import SearchBar from './SearchBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components|search/SearchBar',
  component: SearchBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (argTypes: any) => <SearchBar {...argTypes} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.arguments = {
  primary: true,
  label: 'SearchBar',
};

export const Secondary = Template.bind({});
Secondary.arguments = {
  label: 'SearchBar',
};
