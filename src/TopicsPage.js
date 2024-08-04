
const boxLength = 64; // (Check tailwind Height list)
const tailwindstring = "h-" + boxLength + " w-" + boxLength; 

const topics = [
  {id: 1, topic: "Traveling"},
  {id: 1, topic: "Traveling"},
  {id: 1, topic: "Traveling"},
  {id: 1, topic: "Traveling"},
  {id: 1, topic: "Traveling"},
  {id: 2, topic: "Family"}
]

const Topic = () => (
    topics.map(topic => (
      <div className={`${tailwindstring} block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock`}>
        <h2 className="lg text-center">{topic.topic}</h2>
      </div>
    ))
)

const TopicsPage= () => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
    <Topic />
  </div>
);

export default TopicsPage;
