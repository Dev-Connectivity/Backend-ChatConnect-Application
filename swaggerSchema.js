const ssoLoginSchema = {
    createUser: {
        path: '/signUp',
        method: 'post',
        summary: 'Create user',
        description: 'Create a new user account',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string' },
                            first_name: { type: 'string' },
                            last_name: { type: 'string' },
                            password: { type: 'string' }
                        },
                        required: ['email', 'first_name', 'last_name', 'password']
                    }
                }
            }
        },
        responses: {
            '201': {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                data: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string' },
                                        first_name: { type: 'string' },
                                        last_name: { type: 'string' },
                                        created_on: { type: 'string' },
                                        token: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'string' }
                            }
                        }
                    }
                }
            },
            '500': {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    },
    siginUser: {
        path: '/login',
        method: 'post',
        summary: 'Login user',
        description: 'Authenticate user and generate token',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                description: 'User email',
                                example: 'user@example.com',
                            },
                            password: {
                                type: 'string',
                                description: 'User password',
                                example: 'password123',
                            },
                        },
                        required: ['email', 'password'],
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'object',
                                            properties: {
                                                // Define the properties of the user object here
                                                // (e.g., email, id, is_admin, first_name, last_name)
                                            },
                                        },
                                        token: {
                                            type: 'string',
                                            description: 'Authentication token',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpZCI6MSwiaXNfYWRtaW4iOmZhbHNlLCJmaXJzdF9uYW1lIjoiVXNlciIsImxhc3RfbmFtZSI6Ik5hbWUiLCJpYXQiOjE2MzE3MzEwMDR9.-MbqUE5h8uN4j1nmxkexva1ZS4wSZM9Qz_JMi0BL8Q0',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // Define other possible response codes and descriptions here
        },
    },
    getAllUser: {
        path: '/fetch-all-users',
        method: 'get',
        summary: 'Fetch all users',
        description: 'Retrieve all registered users',
        responses: {
            '200': {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            userName: {
                                                type: 'string',
                                            },
                                            email: {
                                                type: 'string',
                                            },
                                            requestedDate: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // Define other possible response codes and descriptions here
        },
    },
    deleteUser: {
        path: '/delete',
        method: 'post',
        summary: 'Delete user',
        description: 'Delete an existing user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                description: 'Email of the user to be deleted',
                                example: 'user@example.com'
                            }
                        },
                        required: ['email']
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    description: 'Success message',
                                    example: 'User deleted successfully'
                                }
                            }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    description: 'Error message',
                                    example: 'Email is missing'
                                }
                            }
                        }
                    }
                }
            },
            '404': {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    description: 'Error message',
                                    example: 'User with this email does not exist'
                                }
                            }
                        }
                    }
                }
            },
            '500': {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'string',
                                    description: 'Error message',
                                    example: 'Operation was not successful'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    ssoLogin: {
        path: '/sso-login',
        method: 'post',
        summary: 'Login with token',
        description: 'Authenticate user with token',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                description: 'User email',
                            },
                            password: {
                                type: 'string',
                                description: 'User password',
                            },
                        },
                        required: ['email', 'password'],
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            description: 'User email',
                                        },
                                        id: {
                                            type: 'string',
                                            description: 'User ID',
                                        },
                                        is_admin: {
                                            type: 'boolean',
                                            description: 'User admin status',
                                        },
                                        first_name: {
                                            type: 'string',
                                            description: 'User first name',
                                        },
                                        last_name: {
                                            type: 'string',
                                            description: 'User last name',
                                        },
                                        token: {
                                            type: 'string',
                                            description: 'Authentication token',
                                        },
                                    },
                                },
                            },
                        },
                        example: {
                            data: {
                                email: 'user@example.com',
                                id: '123456789',
                                is_admin: false,
                                first_name: 'John',
                                last_name: 'Doe',
                                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                            },
                        },
                    },
                },
            },
            // Rest of the responses...
        },
    }
};

module.exports = ssoLoginSchema;
