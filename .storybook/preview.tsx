import type { Preview } from '@storybook/react-vite';
import '../app/app.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'rose-pine-base',
      values: [
        {
          name: 'rose-pine-base',
          value: 'hsl(249, 22%, 12%)',
        },
        {
          name: 'rose-pine-moon',
          value: 'hsl(246, 24%, 17%)',
        },
        {
          name: 'rose-pine-dawn',
          value: 'hsl(32, 57%, 95%)',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: {
        base: 'dark',
        colorPrimary: '#c4a7e7',
        colorSecondary: '#9ccfd8',
        appBg: '#191724',
        appContentBg: '#1f1d2e',
        appBorderColor: '#26233a',
        textColor: '#e0def4',
        textInverseColor: '#191724',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  globalTypes: {
    theme: {
      description: 'Rose Pine theme variants',
      defaultValue: 'base',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'base', title: 'Rose Pine Base' },
          { value: 'moon', title: 'Rose Pine Moon' },
          { value: 'dawn', title: 'Rose Pine Dawn' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      
      // Apply theme class to the story container
      return (
        <div 
          className={`rp-${theme} min-h-screen bg-background text-foreground p-4`}
          style={{ colorScheme: theme === 'dawn' ? 'light' : 'dark' }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;