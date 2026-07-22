export interface AuditLog {

    _id:string;

    actor:string;

    role:string;

    action:string;

    resource:string;

    resourceType:string;

    ipAddress:string;

    region:string;

    severity:"LOW"|"MEDIUM"|"HIGH";

    status:"Resolved"|"Unresolved";

    timestamp:string;

}

export interface DashboardStats{

    totalLogs:number;

    high:number;

    medium:number;

    low:number;

    resolved:number;

    unresolved:number;

}