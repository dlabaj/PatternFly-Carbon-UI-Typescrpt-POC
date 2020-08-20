import {ReactNode, Props} from 'react';

export interface HeadingProps extends Props<HTMLHeadingElement> {
    level: number;
    children: ReactNode;
}