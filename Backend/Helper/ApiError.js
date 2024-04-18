class ApiError extends Error{
    
    constructor(status,name,message){
        super()
        this.message=message,
        this.name=name
        this.status=status
        this.success=status>399
    }
}
module.exports=ApiError