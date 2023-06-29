import { Collection, MongoClient, WithId } from 'mongodb'
export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map: <T,> (data: WithId<Document>): T => {
    const { _id, ...dataWithoutId } = data
    return {
      id: _id.toString(),
      ...dataWithoutId
    } as unknown as T
  }
}
