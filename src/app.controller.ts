import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.services";

@Controller('/api')
export class AppController{

    constructor(private appService: AppService){}

    

}