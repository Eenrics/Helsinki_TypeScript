// ["js", "json", "node", "ts", "tsx"]
// entries.json module will take the preceedent .. than entries.ts.. B/C of ↑

type Weather = "windy" | "rainy" | "stormy" | "cloudy" | "sunny";

type Visibility = "good" | "ok" | "poor";

interface Entry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

const entries: Entry[] = [
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
];

export default entries;