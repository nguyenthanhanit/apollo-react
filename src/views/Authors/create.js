import StoreForm from "../../containers/StoreForm";

export default function Author() {
    const fields = {
        name: 'String',
        gender: 'Boolean'
    };

    return <StoreForm fields={fields}/>
}