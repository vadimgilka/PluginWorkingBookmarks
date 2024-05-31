export type Note = {
    id: string,
    name: string,
    url: string,
    description: string,
    isread : Number,
    adddate: Date,
    readdate: Date,
    userId: string,
    categoryId: string,
    mapId: string,
  }

  export type Category = {
    id: string,
    name: string,
    userId: string
  }

  export type Map = {
    id: string,
    name: string,
    userId: string
  }

  export type Notif = {
    id: number,
    text: string,
    userId: number
    noteId: number
    type: number
  }