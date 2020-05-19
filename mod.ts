class WindowsServices{

    async getServicesList(){
        return new Promise<Array<Object>>( async (resolve, reject) => {
            let proc = Deno.run({
                cmd: ["sc", "query", "state=all"],
                stdin: 'piped',
                stdout: 'piped',
                stderr: 'piped',
            });
            
            const rawOutput = await proc.output();
            const rawErrOutput = await proc.stderrOutput();
            const decodedErrOutput = new TextDecoder("utf-8").decode(rawErrOutput);
            if(decodedErrOutput){
                reject(decodedErrOutput);
                return;
            }

            const decodedOutput = new TextDecoder("utf-8").decode(rawOutput);
            var groupedServices = decodedOutput.trim().split("\r\n\r\n");
            
            let list_services: any = [];

            var groupedServicesMap = groupedServices.map((serviceDetails, index) => {
                let splitServiceDetails = serviceDetails.trim().split("\r\n");
                let service_info = {
                    serviceName: splitServiceDetails[0].split(":")[1].trim(),
                    serviceDescription: splitServiceDetails[1].split(":")[1].trim(),
                    serviceType: splitServiceDetails[2].split(":")[1].trim(),
                    serviceState: splitServiceDetails[3].split(":")[1].trim(),
                    serviceIsRunning: splitServiceDetails[3].split(":")[1].trim().toUpperCase().includes("RUNN")
                }

                list_services.push(service_info);
            });
            
            Promise.all(groupedServicesMap);

            resolve(list_services);
        });
    }

    async stopService(process_name: string){
        return new Promise(async (resolve, reject) => {
            let proc = Deno.run({
                cmd: ["net", "stop", process_name],
                stdin: 'piped',
                stdout: 'piped',
                stderr: 'piped',
            });
            
            const rawErrOutput = await proc.stderrOutput();
            const decodedErrOutput = new TextDecoder("utf-8").decode(rawErrOutput);
            if(decodedErrOutput){
                reject(decodedErrOutput);
                return;
            }

            const rawOutput = await proc.output();
            const decodedOutput = new TextDecoder("utf-8").decode(rawOutput);
            resolve(true);
        });
    }

    async startService(process_name: string){
        return new Promise(async (resolve, reject) => {
            let proc = Deno.run({
                cmd: ["net", "start", process_name],
                stdin: 'piped',
                stdout: 'piped',
                stderr: 'piped',
            });
            
            const rawErrOutput = await proc.stderrOutput();
            const decodedErrOutput = new TextDecoder("utf-8").decode(rawErrOutput);
            if(decodedErrOutput){
                reject(decodedErrOutput);
                return;
            }

            const rawOutput = await proc.output();
            const decodedOutput = new TextDecoder("utf-8").decode(rawOutput);
            resolve(true);
        });
    }

}

export default new WindowsServices();