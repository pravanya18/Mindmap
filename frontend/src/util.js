let nodeId = 1
let initialNodes = []
let initialEdges = []
export const formGraphStructure = (data) => {
    initialEdges = []
    initialNodes = []
    return new Promise((resolve, reject) => {
        traverse(data, null)
            .then(() => resolve({ initialNodes, initialEdges }))
            .catch(err => reject(err));
    });
}


const traverse = (node, parentId = null) => {
    return new Promise((resolve, reject) => {
        const currentId = String(nodeId++);
        const nodeData = {
            id: currentId,
            type: 'customNode',
            data: {
                label: node.name,
                link: node.link,
                definition: node.description
            },
            position: { x: 0, y: 0 }
        };
        initialNodes.push(nodeData);

        if (parentId) {
            initialEdges.push({
                id: `e${parentId}-${currentId}`,
                source: parentId,
                target: currentId
            });
        }

        if (node.children) {
            Promise.all(node.children.map(child => traverse(child, currentId)))
                .then(() => resolve())
                .catch(err => reject(err));
        } else {
            resolve();
        }
    });
}