//
//  Client.swift
//  App
//
//  Created by Jonathan Green on 10/4/18.
//

import Vapor

class APIClient {
    
    func send(client: Client,clientRoute:ClientRoute,container:Container,response:Response) throws -> EventLoopFuture<Response> {
        print(client)
        let httpRes = client.send(Request(http: clientRoute.request(), using: container))
        print(clientRoute.request())
        print(httpRes)
        return httpRes
    }
    
}
