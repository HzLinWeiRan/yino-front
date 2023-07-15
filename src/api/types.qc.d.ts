declare namespace API {
  interface IData {
    findItem: boolean
    hasPhoto: boolean
    fineSkuList: Array<string>
    url: string
  }
}

declare namespace API {
  interface PageParams {
    pageSize?: number
    pageNum?: number
  }
  interface IDataParams extends PageParams {
    userList: Array<string>
  }
}
