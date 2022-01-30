import { useEffect, useState } from "react";
import Button from "../components/Button";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import CollectionClient from "../backend/db/CollectionClient";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";

export default function Home() {

  const repository: ClientRepository = new CollectionClient()

  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  useEffect(getAll, [])

  function getAll() {
    repository.getAll().then(clients => {
      setClients(clients)
      setVisible('table')
    })
  }

  function selectedClient(client: Client) {
    setClient(client)
    setVisible('form')
  }

  async function deletedClient(client: Client) {
    await repository.delete(client)
    getAll()
  }

  function newClient(client: Client) {
    setClient(Client.empty())
    setVisible('form')
  }

  async function saveClient(client: Client) {
    await repository.save(client)
    getAll()
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cadastro simples">

        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="green"
                className="mb-4"
                onClick={newClient}>
                Novo cliente
              </Button>
            </div>

            <Table clients={clients}
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            onChange={saveClient}
            cancel={() => setVisible('table')}
          />
        )}

      </Layout>
    </div>
  )
}