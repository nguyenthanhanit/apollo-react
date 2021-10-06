import _ from "lodash";

export function onChange(event, setDataForm, dataForm) {
    const target = event.target;
    let {name, value} = target;
    if (_.includes(['radio', 'select-one', 'checkbox'], target.type)) {
        if (value === 'true') {
            value = true
        } else if (value === 'false') {
            value = false
        } else if (!_.isNaN(parseInt(value))) {
            value = parseInt(value)
        }
    }

    if (_.isArray(dataForm[name])) {
        const cloneData = dataForm[name];
        if (target.checked) {
            cloneData.push(value)
        } else {
            _.remove(cloneData, function (o) {
                return o === value;
            })
        }
        value = cloneData;
    }

    setDataForm({
        ...dataForm,
        ...{
            [name]: value
        }
    });
}

export function save(event, action, data) {
    event.preventDefault();
    action({
            variables: data
        }
    );
}