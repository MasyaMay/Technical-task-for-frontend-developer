export default class Service {

    async getData(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getContactsId = async (id) => {
        let contacts = await this.getData('http://localhost:3000/contacts');
        contacts = contacts.filter(item => item.id === id).map(item => {
            const {id, ...contacts} = item;
            return contacts;
        })
        return Object.entries(contacts[0]);
    }

    getApprovalLogin = async (login, password)  => {
        const users = await this.getData('http://localhost:3000/users');
        let id = null;
        if (login && password) {
            for(let i = 0; i < users.length; i++) {
                if (users[i].login === login && users[i].password === password) {
                    id = users[i].id;
                    break;
                }
            }
        } 
        return {id}
    }
}