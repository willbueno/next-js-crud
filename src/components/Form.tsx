import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
    client: Client
    onChange?: (client: Client) => void
    cancel?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)

    return (
        <div>
            {id ? (
                <Input
                    readOnly
                    text="Codigo"
                    value={id}
                    className="mb-4"
                />
            ) : false}
            <Input
                text="Nome"
                value={name}
                onChange={setName}
                className="mb-4"
            />
            <Input
                text="Idade"
                type="number"
                value={age}
                onChange={setAge}
            />

            <div className="flex justify-end mt-3">
                <Button
                    color="blue"
                    className="mr-2"
                    onClick={() => props.onChange?.(new Client(name, +age, id))}
                >
                    {id ? "Alterar" : "Salvar"}
                </Button>
                <Button onClick={props.cancel}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}