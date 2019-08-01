export class MenuItem{
    public label?: string;
    public icon?: string;
    public command?: (event?: any) => void;
    public url?: string;
    public routerLink?: any;
    public items?: MenuItem[];
    public expanded?: boolean;
    public disabled?: boolean;
    public visible?: boolean;
    public target?: string;
}