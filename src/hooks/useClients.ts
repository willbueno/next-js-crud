import { useEffect, useState } from "react"
import CollectionClient from "../backend/db/CollectionClient"
import Client from "../core/Client"
import ClientRepository from "../core/ClientRepository"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {
    const repository: ClientRepository = new CollectionClient()

    const { tableVisible, showTable, showForm } = useTableOrForm()

    const [client, setClient] = useState<Client>(Client.empty())
    const [clients, setClients] = useState<Client[]>([])

    useEffect(getAll, [])

    function getAll() {
        repository.getAll().then(clients => {
            setClients(clients)
            showTable()
        })
    }

    function newClient() {
        setClient(Client.empty())
        showForm()
    }

    function selectClient(client: Client) {
        setClient(client)
        showForm()
    }

    async function saveClient(client: Client) {
        await repository.save(client)
        getAll()
    }

    async function deleteClient(client: Client) {
        await repository.delete(client)
        getAll()
    }

    return {
        client,
        clients,
        getAll,
        newClient,
        selectClient,
        saveClient,
        deleteClient,
        tableVisible,
        showTable
    }
}