# Data Model

## Employee
- **id**: string  
- **fullName**: string  
- **personalEmail**: string  
- **phoneNumber**: string  
- **departmentId**: UUID (FK → Department)  
- **corporateEmailSuggestion1**: string  
- **corporateEmailSuggestion2**: string  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## Address
- **id**: UUID  
- **employeeId**: UUID (FK → Employee)  
- **street**: string  
- **number**: string  
- **complement**: string  
- **district**: string  
- **city**: string  
- **cep**: string  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## Department
- **id**: UUID  
- **name**: string  
- **description**: string  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## Tool
- **id**: UUID  
- **name**: string  
- **description**: string  
- **url**: string  
- **category**: enum { BACKOFFICE, INTERNAL, EXTERNAL }  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## AccessProvisioning
- **id**: UUID  
- **employeeId**: UUID (FK → Employee)  
- **toolId**: UUID (FK → Tool)  
- **status**: enum { REQUESTED, APPROVED, REJECTED, PROVISIONED }  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## Device
- **id**: UUID  
- **name**: string // e.g., "Dell Latitude Laptop"  
- **type**: enum { LAPTOP, MONITOR, PHONE, ACCESSORY }  
- **description**: string  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## DeviceProvisioning
- **id**: UUID  
- **employeeId**: UUID (FK → Employee)  
- **deviceId**: UUID (FK → Device)  
- **deliveryAddressId**: UUID (FK → Address)  
- **status**: enum { REQUESTED, APPROVED, REJECTED, DELIVERED }  
- **requestDate**: datetime  
- **deliveryDate**: datetime  
- **createdAt**: datetime  
- **updatedAt**: datetime  

---

## Approval
- **id**: UUID  
- **userId**: UUID (FK → User)  
- **employeeId**: UUID (FK → Employee)  
- **type**: enum { DEVICE, SOFTWARE }  
- **decision**: enum { APPROVED, REJECTED }  
- **justification**: text  
- **createdAt**: datetime  
