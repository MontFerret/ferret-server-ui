import gql from 'graphql-tag';

export const findQuery = gql`
    query findProjects($query: Query) {
        output(query: $query)
            @rest(type: "[Project]", path: "/projects?{args.query}") {
            paging
            data
        }
    }
`;

export const getQuery = gql`
    query projectName($id: String!) {
        output(id: $id) @rest(type: "Project", path: "/projects/{args.id}") {
            name
        }
    }
`;

export const createMutation = gql`
    mutation createProject($input: Project!) {
        output(input: $input) @rest(method: "POST", path: "projects") {
            id
        }
    }
`;
