# rc-pannellum

just a simple code encapsulation, written in typescript and has some types inferable

original library [pannellum](https://github.com/mpetroff/pannellum)

## usage

```sh
yarn add rc-pannellum
```

```tsx
import Pannellum, { PannellumRef } from 'rc-pannellum';

const App = () => {
  const viewerRef = useRef<PannellumRef | null>(null);

  useEffect(() => {
    // viewer instance
    const viewer = viewerRef.current?.getViewer();
    if (viewer) {
      viewer.on('mousedown', (e: MouseEvent) => {
        console.log(e);
      });
    }
  }, []);

  const config = {
    autoLoad: true,
    panorama: 'https://pannellum.org/images/alma.jpg',
  };

  return (
    <Pannellum
      ref={viewerRef}
      clickInfo
      className="viewer"
      style={{
        width: "100vw",
        height: "100vh"
      }}
      {...config}
    />
  );
};
```
## props

| name      | type          |                                  |
| --------- | ------------- | -------------------------------- |
| style     | CSSProperties | container style                  |
| className | string        | container classname              |
| clickInfo | boolean       | console pitch and yaw when click |

