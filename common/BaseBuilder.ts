
export interface Element {

    name: string;

    content(formatInfo: FormatInfo): string;

}

export interface BaseBuilder extends Element {

    /**
     * File path, including name.
     */
    path: string;

}

export interface FormatInfo {

    indent: string;

}
