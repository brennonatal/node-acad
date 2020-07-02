import Sql = require('../infra/sql')

export = class Transaction {
    public id: number
    public name: string
    public type: string
    public value: number
    public date: Date

    public constructor (id: number, name: string, type: string, value: number, date: Date) {
        this.id = id
        this.name = name
        this.type = type
        this.value = value
        this.date = date
    }

    private static validate(transaction: Transaction): string {

        if (transaction.name) transaction.name = transaction.name.trim()

        if (transaction.type) transaction.type = transaction.type.trim()

        if (!transaction.name || !transaction.type || !transaction.value || isNaN(transaction.value)) return "Invalid data"

        if (transaction.name.length > 20) return "Name is too long"

        return null
    }

    public static async create(transaction: Transaction): Promise<string> {
        let err: string = Transaction.validate(transaction)

        if (err) return err

        await Sql.conectar(async (sql: Sql) => {

            try {
                await sql.query(`INSERT INTO transactions (nome, tipo, valor, dia) 
                                VALUES (?, ?, ?, CURDATE() )`, [transaction.name, transaction.type, transaction.value])

                transaction.id = await sql.scalar('SELECT last_insert_id()') as number
            } catch (e) {
                throw e
            }
    
        })

        return err
    }

    public static async delete(id: number): Promise<string> {
        let err: string = null

        await Sql.conectar(async (sql: Sql) => {

            await sql.query('DELETE FROM transactions WHERE id = ?', [id])

            if (!sql.linhasAfetadas) {
                err = 'Transaction not found'
            }
            
        })
        
        return err
    }
    
    public static async getAll(): Promise<Transaction[]> {
        let transactions: Transaction[] = null

        await Sql.conectar(async (sql: Sql) => {
            transactions = await sql.query('SELECT * FROM transactions') as Transaction[]
        })

        return transactions
    }
    
    
}