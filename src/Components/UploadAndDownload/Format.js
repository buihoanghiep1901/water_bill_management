const userFormat=[
    'uid',
    'fullname',
    'email',
    'password',
    'role',
    'avatar',
    'phone',
    'address',
    'status',
    'date_created',
    'date_updated',
]

const clientFormat=[
    'uid',
    'fullname',
    'category',
    'status',
    'firstreading',
    'phone',
    'address',
    'date_created',
    'date_updated',
]

const billFormat=[
    'uid',
    'clientID',
    'previous_read',
    'current_read',
    'amount',
    'total',
    'status',
    'reading_date',
    'due_date',
    'date_created',
    'date_updated',
]

const categoryFormat=[
    'uid',
    'title',
    'detail',
    'date_created',
    'date_updated',
]

export const format={

    user: userFormat,
    client: clientFormat,
    bill:billFormat,
    category:categoryFormat,
}