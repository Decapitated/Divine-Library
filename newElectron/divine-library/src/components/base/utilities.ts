// Credit: https://awik.io/check-if-element-is-inside-viewport-with-javascript/
export function elementInViewport(element: Element): boolean {
    const bounding = element.getBoundingClientRect();
    return bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Check if #1 is in #2.
export function elementInElement(element_1: Element, element_2: Element): boolean {
    const bounding_1 = element_1.getBoundingClientRect(),
          bounding_2 = element_2.getBoundingClientRect();
    if(d_Equal(bounding_1.top, bounding_2.top) == DetailedBool.Less) return false;
    if(d_Equal(bounding_1.right, bounding_2.right) == DetailedBool.More) return false;
    if(d_Equal(bounding_1.bottom, bounding_2.bottom) == DetailedBool.More) return false;
    if(d_Equal(bounding_1.left, bounding_2.left) == DetailedBool.Less) return false;
    return true;
}

export enum DetailedBool {
    Less = -1,
    Equal = 0,
    More = 1
}
// Detailed Equal
export function d_Equal(val_1: number, val_2: number): DetailedBool {
    const detail = val_2 - val_1;
    if(detail < 0) return DetailedBool.Less;
    if(detail == 0) return DetailedBool.Equal;
    if(detail > 0) return DetailedBool.More;
}

type Point = {
    x: number;
    y: number;
};

// Check four sides. Could do four corners, but doesn't work with border-radius.
// Child elements that overlap need pointer-events: none; or else it'll return false;
export function elementVisible(element: Element): boolean {
    const bounding = element.getBoundingClientRect();
    const middle = { x: bounding.left + (bounding.right - bounding.left)/2, y: bounding.top + (bounding.bottom - bounding.top)/2 } as Point;
    const points = [
        { x: middle.x, y: bounding.top+1 },     // Top-Left
        { x: bounding.right-1, y: middle.y },    // Top-Right
        { x: middle.x, y: bounding.bottom-1 }, // Bottom-Right
        { x: bounding.left+1, y: middle.y },     // Bottom-Left,
        middle
    ] as Point[];
    let valid = true;
    points.forEach((point) => {
        let tempElem = document.elementFromPoint(point.x, point.y);
        if(tempElem === null || (tempElem !== element && (!isChild(tempElem, element) || elementInElement(tempElem, element)))) valid = false;
    });
    return valid;
}

// Checks if element is contained within parentElement.
export function isChild(element: Element, parentElement: Element){
    while (element.tagName.toUpperCase() != 'BODY'){
        if (element == parentElement){
            return true;
        }
        element = element.parentNode;
    }
    return false;
}