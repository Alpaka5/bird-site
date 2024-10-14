import {Component} from 'react';

export type CollapsibleProps = { props?: string };

export default class Collapsible extends Component<CollapsibleProps> {
    constructor(props: object){
        super(props);
        this.state = {open: false};
    }
    toggle = () => {
        this.setState({open: !this.state.open})
    };



    render() {

        return (
            <div>
                <button className={this.props.className} onClick={this.toggle}>{this.props.label}</button>
                {this.state.open &&
                    <div>{this.props.children}</div>}
            </div>
        );
    }
}

// export default function Collapsible(props: any) {
//     const [open, setOpen] = useState(false);
//
//     const toggle = () => {
//         setOpen(!open);
//     };
//
//     return (
//         <div>
//             <button className={props.className} onClick={toggle}>{props.label}</button>
//             {open &&
//                 <div>{props.children}</div>}
//         </div>
//     );
// }
