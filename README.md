# React Hook useClickOutside

This is a React hook to detect click outside of the target(s) elements.

## Usage

Common usage:
```jsx
import { useClickOutside } from 'react-hook-click-outside'

const Modal = () => {
    const ref = useRef();
    const [isOpened, setIsOpened] = useState(false);

    useClickOutside({
        isActive: true,
        ignoreClicksInsideRefs: [ref],
        handler: () => setIsOpened(false)
    })

    return <div>
        <button type="button" onClick={() => setIsOpened(true)}>Open modal</button>
        {isOpened && <div ref={ref}>Modal</div>}
    </div>
}
```

If you want ignore element from other tree, than you can use data-attributes:
```jsx
import { useClickOutside } from 'react-hook-click-outside'

const Modal = () => {
    const ref = useRef();

    useClickOutside({
        isActive: true,
        ignoreClicksInsideRefs: [ref]
        ignoreAttributeValue: 'element-from-other-tree',
        handler: () => setIsOpened(false)
    })

    return <div>
        <button type="button" onClick={() => setIsOpened(true)}>Open modal</button>
        {isOpened && <div ref={ref}>Modal</div>}
    </div>
}

const App = () => {
    return <div>
        <div data-click-outside-ignore="element-from-other-tree">Example</div>
        <Modal />
    </div>
}
```

## API
| Key                    | Type        | Default                   | Description                             |
|------------------------|-------------|---------------------------|-----------------------------------------|
| isActive               | boolean     | true                      | Enable/disable hook                     |
| ignoreClicksInsideRefs | RefObject[] |                           | Array with refs to ignore click         |
| handler                | Function    |                           | Handler will call when we click outside |
| ignoreAttributeName    | string      | data-click-outside-ignore | Data attribute name to ignore click     |
| ignoreAttributeValue   | string      |                           | Data attribute value to ignore click    |