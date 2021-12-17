import { RefObject, useEffect } from 'react';

export type ClickOutsideHandler = (event: MouseEvent) => void;

export const useClickOutside = ({
    isActive = true,
    ignoreClicksInsideRefs,
    ignoreAttributeName = 'data-click-outside-ignore',
    ignoreAttributeValue,
    handler,
}: {
    isActive?: boolean;
    ignoreClicksInsideRefs: ReadonlyArray<RefObject<HTMLElement>>;
    ignoreAttributeName?: string;
    ignoreAttributeValue?: string;
    handler: ClickOutsideHandler;
}) => {
    useEffect(() => {
        if (!isActive) {
            return undefined;
        }

        const handleClick = (event: MouseEvent) => {
            const { target } = event;

            if (target && target instanceof HTMLElement) {
                const shouldIgnoreByRef = ignoreClicksInsideRefs.some((ref) => ref.current?.contains(target));
                const shouldIgnoreByAttribute =
                    ignoreAttributeValue !== undefined &&
                    target.closest(`[${ignoreAttributeName} = ${ignoreAttributeValue}]`) !== null;
                const shouldIgnore = shouldIgnoreByRef || shouldIgnoreByAttribute;

                !shouldIgnore && handler(event);
            }
        };

        document.addEventListener('mousedown', handleClick, true);

        return () => {
            document.removeEventListener('mousedown', handleClick, true);
        };
    }, [isActive, ignoreClicksInsideRefs, handler, ignoreAttributeValue]);
};
