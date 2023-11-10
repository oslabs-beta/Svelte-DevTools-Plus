# Svelte DevTools+

![Banner](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/132001570/b53d2370-0e33-41ba-93f5-29e3be538ccd)

## Installation
[<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png">](https://chromewebstore.google.com/detail/svelte-devtools+/bgelkjgjabbfoeiicgoddeadicoofcfk?hl=en-US&utm_source=ext_sidebar)


## Features

### Dynamic component visualization
Svelte DevTools+ allows developers to inspect the component hierarchy of a Svelte application, making it easier to understand the application's structure

![StepAndTree](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/111018220/66be9da9-df13-47dd-a30d-90e66502b0f3)

### Component inspection
When selecting a component in the component tree, developers can inspect the component's props, state, and context to aid in understanding the data and values that are passed to each component

![Inspect](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/111018220/55915031-d66d-4579-8160-2b667cbab4e4)

### Real-time state and props updates
Svelte DevTools+ allows developers to see the real-time changes in a component's state and props, immediately reflecting updates in the DevTool and allowing for simple tracking of the application's behavior

![Dynamic](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/111018220/dff0d4c4-4786-479b-a520-2c26ada59acd)

### Component state modification
Developers can modify the state and props of a selected component directly from the DevTools window for testing and debugging purposes, making it easy to experiment with different scenarios without modifying your code

![Edit](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/111018220/009ddc2b-aa3b-4da8-b97b-b22cff231517)

### State Rewind
Svelte DevTools+ provides a time-travel debugging feature that enables developers to inspect the application's state at different points in time and analyze how the state of the application changes

![Step](https://github.com/oslabs-beta/Svelte-DevTools-Plus/assets/111018220/734d6961-041f-4d74-9e35-b96be3d9bb75)

## Development

1. Fork and clone the repo:

```
git clone https://github.com/oslabs-beta/Svelte-DevTools-Plus.git
```

2. Navigate to the project folder

```
cd Svelte-DevTools-Plus/extension
```

3. Install the necessary packages:

```
npm install
```

## Testing

### To create a development build

```
npm run dev
```

### To create a production build

```
npm run build
```

### To run the test suite
```
npm test
```

### To load the extension
1. In Chrome, navigate to chrome://extensions/
2. Turn on developer mode by clicking the switch in the top right corner
3. Click "Load unpacked" in the top left corner
4. Navigate to your local repository and select the build folder

### Demo apps
For testing, demo apps are included with the repo in the demo-apps folder

## Contributors

[Alexander Vranas](https://github.com/avranas)

[Maciej Małecki](https://github.com/maciekmalecki)

[Janice Chu](https://github.com/JaniceKZ)

[Francis Espinoza](https://github.com/francis8933)

[Laura Glass-Johnston](https://github.com/ellgeejay)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/oslabs-beta/Svelte-DevTools-Plus/blob/main/LICENSE) file for details.


