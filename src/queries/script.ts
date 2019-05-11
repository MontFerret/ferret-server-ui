import gql from 'graphql-tag';

export const findQuery = gql`
    query findScripts($projectId: String!, $query: Query) {
        output(projectId: $projectId, query: $query)
            @rest(
                type: "[Script]"
                path: "/projects/{args.projectId}/scripts?{args.query}"
            ) {
            paging
            data
        }
    }
`;

export const getQuery = gql`
    query findScriptsQuery($projectId: String!, $id: String!) {
        output(projectId: $projectId, id: $id)
            @rest(
                type: "Script"
                path: "/projects/{args.projectId}/scripts/{args.id}"
            ) {
            id
            rev
            createdAt
            name
            description
            execution
            persistence
        }
    }
`;

export const createMutation = gql`
    mutation createScriptMutation($projectId: String!, $input: Script!) {
        output(projectId: $projectId, input: $input)
            @rest(method: "POST", path: "projects/{args.projectId}/scripts") {
            id
            rev
        }
    }
`;

export const updateMutation = gql`
    mutation updateScriptMutation(
        $projectId: String!
        $id: String!
        $input: Script!
    ) {
        output(projectId: $projectId, id: $id, input: $input)
            @rest(
                method: "PUT"
                path: "projects/{args.projectId}/scripts/{args.id}"
            ) {
            id
            rev
        }
    }
`;

export const deleteMutation = gql`
    mutation deleteScriptMutation($projectId: String!, $id: String!) {
        output(projectId: $projectId, id: $id)
            @rest(
                method: "DELETE"
                path: "/projects/{args.projectId}/scripts/{args.id}"
            ) {
            id
            rev
        }
    }
`;

export const runMutation = gql`
    mutation runScriptMutation(
        $projectId: String!
        $id: String!
        $input: ExecutionInput!
    ) {
        output(projectId: $projectId, id: $id, input: $input)
            @rest(method: "POST", path: "/projects/{args.projectId}/exec") {
            jobId
        }
    }
`;
