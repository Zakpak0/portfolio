export default class Pluralsight{
    static get = class {
        static courses = class {
            static async completed() {
                    const query =  await fetch("https://app.pluralsight.com/profile/data/completedcourses/83b81959-5219-4864-a1f6-00bfa47c976f").then(res => res.json()).then((data) => {
                      const courses = data.map((course: { level: string, authors: [{ displayName: string }], title: string, timeCompleted: string, slug: string }) => {
                        let { level, authors, title, timeCompleted, slug } = course;
                        let { displayName } = authors[0];
                        return {
                          level,
                          displayName,
                          title,
                          timeCompleted,
                          slug,
                          site: { name: "Pluralsight", website: "https://www.pluralsight.com/" }
                        }
                      });
                      return courses
                    })
                    return query
            }
        }
    }
}