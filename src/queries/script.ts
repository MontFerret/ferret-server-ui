import gql from 'graphql-tag';

export const findQuery = gql`
    query findScripts($projectId: String!, $query: Query) {
        entities(projectId: $projectId, query: $query)
            @rest(type: "[Script]", path: "/projects/{args.projectId}/scripts?{args.query}" ) {
                id,
                rev,
                createdAt,
                name,
                description
            }
    }
`;

export const getQuery = gql`
    query findScriptsQuery($projectId: String!, $id: String!) {
        entity(projectId: $projectId, id: $id)
            @rest(type: "Script", path: "/projects/{args.projectId}/scripts/{args.id}" ) {
                id,
                rev,
                createdAt,
                name,
                description,
                execution,
                persistence,
            }
    }
`;

export const createMutation = gql`
    mutation createScriptMutation($projectId: String!, $input: Script!) {
        metadata(projectId: $projectId, input: $input) @rest(
            method: "POST",
            path: "projects/{args.projectId}/scripts"
        ) {
            id,
            rev
        }
    }
`;

export const updateMutation = gql`
    mutation updateScriptMutation($projectId: String!, $id: String!, $input: Script!) {
        metadata(projectId: $projectId, id: $id, input: $input) @rest(
            method: "PUT",
            path: "projects/{args.projectId}/scripts/{args.id}"
        ) {
            id,
            rev
        }
    }
`;

export const deleteMutation = gql`
    mutation deleteScriptMutation($projectId: String!, $id: String!) {
        metadata(projectId: $projectId, id: $id) @rest(
            method: "DELETE",
            path: "projects/{args.projectId}/scripts/{args.id}"
        ) {
            id,
            rev
        }
    }
`;
