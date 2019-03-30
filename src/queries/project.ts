import gql from 'graphql-tag';

export const findQuery = gql`
    query findProjects($query: Query) {
        entities(query: $query) @rest(type: "[Project]", path: "/projects?{args.query}") {
            id
            rev
            createdAt
            updatedAt
            name
        }
    }
`;

export const getQuery = gql`
    query projectName($id: String!) {
        entity(id: $id) @rest(type: "Project", path: "/projects/{args.id}") {
            name
        }
    }
`;

export const createMutation = gql`
    mutation createProject($input: Project!) {
        entity(input: $input) @rest(
            method: "POST",
            path: "projects"
        ) {
            id
        }
    }
`;
