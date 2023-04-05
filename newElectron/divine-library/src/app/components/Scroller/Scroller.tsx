import { createRef, useState, useEffect, Fragment } from 'react';
import './Scroller.css';
import React from 'react';

interface PropType {
    speed: number;
    wait: number;
    children: any;
}

function Scroller(props: PropType) {
    let interval: NodeJS.Timer = null, timeout: NodeJS.Timer = null;
    let direction = true; // True = Scrolling moving left.

    let scrollerRef = createRef<HTMLDivElement>();
    let innerRef = createRef<HTMLDivElement>();

    function enter() {
        interval = setInterval(scroll, props.speed);
    }

    function leave() {
        clear();
        scrollerRef.current.scroll(0, 0);
        direction = true;
    }

    function clear() {
        clearTimeout(timeout);
        timeout = null;

        clearInterval(interval);
        interval = null;
    }

    function scroll() {
        const parent = scrollerRef.current.getBoundingClientRect();
        const child =  innerRef.current.getBoundingClientRect();

        if(parent.width < child.width) {
            scrollerRef.current.scrollBy(direction ? 1 : -1, 0);
            if((!direction && child.left >= parent.left-1) || (direction && child.right <= parent.right+1)) {
                if(timeout == null) {
                    timeout = setTimeout(() => {
                        direction = !direction;
                        timeout = null;
                    }, props.wait);
                }
            }
        }
    }

    return(
    <div className="scroller"
        ref={scrollerRef}
        onMouseEnter={enter}
        onMouseLeave={leave}>
            <div ref={innerRef}>{props.children}</div>
    </div>);
}

export default Scroller;