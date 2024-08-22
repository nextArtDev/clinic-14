// import { request, RequestOptions, IncomingMessage } from 'https'

// interface SendSMSParams {
//   to: string
//   from: string
//   text: string
//   isFlash?: boolean
// }

// interface BaseServiceNumberParams {
//   text: string
//   to: string
//   bodyId: string
// }

// interface GetDeliveriesParams {
//   recId: string
// }

// interface GetMessagesParams {
//   location: string
//   index: number
//   count: number
//   from?: string
// }

// class Base {
//   constructor(username: string, password: string) {
//     // Base class implementation
//   }
// }

// class RestAsync extends Base {
//   private options: {
//     host: string
//     path: string
//   }

//   constructor(username: string, password: string) {
//     super(username, password)
//     this.options = {
//       host: 'rest.payamak-panel.com',
//       path: 'api/SendSMS',
//     }
//   }

//   private request<T>(method: string, params: Record<string, any>): Promise<T> {
//     const path = `https://${this.options.host}/${this.options.path}/${method}`
//     params = Object.assign({}, this.data, params)
//     const postdata = querystring.stringify(params)
//     const post_options: RequestOptions = {
//       host: this.options.host,
//       port: '443',
//       path: path,
//       method: 'POST',
//       headers: {
//         'Content-Length': postdata.length,
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       },
//     }
//     return new Promise((resolve, reject) => {
//       const req = request(post_options, (res: IncomingMessage) => {
//         res.setEncoding('utf8')
//         let data = ''
//         res.on('data', (chunk) => {
//           data += chunk
//         })
//         res.on('end', () => {
//           resolve(JSON.parse(data) as T)
//         })
//       })

//       req.write(postdata, 'utf8')
//       req.on('error', (e) => {
//         reject(JSON.stringify({ error: e.message }))
//       })
//       req.end()
//     })
//   }

//   send(
//     to: string,
//     from: string,
//     text: string,
//     isFlash: boolean = false
//   ): Promise<any> {
//     return this.request('SendSMS', { to, from, text, isFlash })
//   }

//   sendByBaseNumber(text: string, to: string, bodyId: string): Promise<any> {
//     return this.request('BaseServiceNumber', { text, to, bodyId })
//   }

//   isDelivered(recId: string): Promise<any> {
//     return this.request('GetDeliveries2', { recId })
//   }

//   getMessages(
//     location: string,
//     index: number,
//     count: number,
//     from: string = ''
//   ): Promise<any> {
//     return this.request('GetMessages', { location, index, count, from })
//   }

//   getCredit(): Promise<any> {
//     return this.request('GetCredit', {})
//   }

//   getBasePrice(): Promise<any> {
//     return this.request('GetBasePrice', {})
//   }

//   getNumbers(): Promise<any> {
//     return this.request('GetUserNumbers', {})
//   }
// }

// export default RestAsync
