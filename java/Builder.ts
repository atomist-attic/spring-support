
import { BaseBuilder, Element, FormatInfo } from "../common/BaseBuilder";

export class JavaFormatInfo implements FormatInfo {
    public indent: string = "    ";
}

export interface JavaElement extends Element {

    visibility: Visibility;

}

export interface TypeBuilder extends BaseBuilder, JavaElement {

    pkg: string;

}

export type Visibility = "public" | "private" | "protected";

function pathTo(tb: TypeBuilder): string {
    return "/" + tb.pkg.replace(".", "/") + "/" + tb.name + ".java";
}

// TODO InterfaceBuilder

/**
 * Fluent API for building classes
 */
export class ClassBuilder implements TypeBuilder {

    private members: Member[] = [];

    constructor(
        public pkg: string,
        public name: string,
        public isAbstract: boolean = false,
        public isFinal: boolean = false,
        public visibility: Visibility = "public") {}

    get path(): string {
        return pathTo(this);
    }

    public content(): string {
        let s = `${this.visibility} class ${this.name} {\n`;
        s += "\n";
        s += this.members.filter(m => m instanceof Field).map(f => f.content).join("\n");
        s += this.members.filter(m => m instanceof Method).map(f => f.content).join("\n");
        s += "}";
        return s;
    }

    public addMember(m: Member) {
        this.members.push(m);
    }

    public addBeanProperty(name: string, type: string) {
        this.addMember(new Method(name, type));
        this.addMember(new Method("SETXX", "void", `this.${name} = ${name};`));
        this.addMember(new Method("GET", type, `return ${this.name};`));
    }

}

export interface Member extends JavaElement {

    name: string;

    type: string;
}

export class Field implements Member {

    constructor(public name: string, public type: string, public visibility: Visibility = "private") {}

    public content(): string {
        return `${this.visibility} ${this.type} ${this.name};`;
    }

}

export class Method implements Member {

    constructor(public name: string, public type: string, public body: string = "", public visibility: Visibility = "public") {}

    public content(): string {
        return `${this.visibility} ${this.type} ${this.name}() {\n${this.body}\n}`;
    }

}
