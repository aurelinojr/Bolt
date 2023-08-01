import { Repository } from "../repositories/Repository";
import { Service } from "../services/Service";

describe("Create User", () => {

    let service = new Service(Repository);

    const name = 'test';
    const username = 'test'; 
    
    it("Deve ser possível criar um usuário ", async () => {
     
        const user: any = {'email' : 'test@bolt.com.br',  'name' : 'test', 'username' : 'test'};
        const where = JSON.parse(`{"AND": [{ "name": "${name}" }, { "username": "${username}" }]}`);

        await service.delete('user',where,[]);

        const result = await service.insert('user',user, ['name','username','email']);

        expect(result).toHaveProperty('id');

    });
    
    it("Deve ser possível alterar um usuário", async () => {

        const params = {name: name, username: username};
        const data : any = {name : 'macarrão'};

        const result = await service.update('user',params,[],[],data);

        expect(result).toHaveReturned();

    });
/*
    it("Não deve ser possível criar um usuário", async () => {
        
        const user : any = {email : 'test5@bolt.com.br',  name : 'test5', username : 'test5'};

        const result = await service.insert('user',user, []);

        await expect(result)
        .rejects         
        .toThrow("Usuário já cadastrado!");
    });
    */
});
