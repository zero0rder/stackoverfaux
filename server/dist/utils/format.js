/**
 *
 *  Gather & Filter all Users Data
 *
 */
export function formatUsers(A) {
    const users = [];
    for (let q of A) {
        users.push(q.user);
        if (q.comments?.length) {
            for (let c of q.comments) {
                users.push(c.user);
            }
        }
        if (q.answers?.length) {
            for (let a of q.answers) {
                users.push(a.user);
                if (a.comments?.length) {
                    for (let com of a.comments) {
                        users.push(com.user);
                    }
                }
            }
        }
    }
    return filterUsers(users);
}
function filterUsers(A) {
    return A.filter((obj, i) => A.findIndex((j) => j.id === obj.id) === i);
}
// Generate Random ID
export const generateRandomId = () => Math.abs(~~(Math.random() * ~~(Math.random() * Date.now())));
//# sourceMappingURL=format.js.map