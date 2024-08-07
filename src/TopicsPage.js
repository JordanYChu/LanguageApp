import { CirclePlus, Search} from 'lucide-react';
import { Link } from "react-router-dom";

const topics = [
  {id: 1, topic: "Traveling"},
  {id: 2, topic: "Testing"},
  {id: 3, topic: "Boring stuff"},
  {id: 4, topic: "Cool topic"},
  {id: 5, topic: "Forgetful topics"},
  {id: 6, topic: "Family"}
]

const Topic = () => (
    topics.map(topic => (
      <Link key={`${topic.id}`} to={`/topics/${topic.id}`} className={`size-full aspect-square inline p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock`}>
        <h2 className="text-lg text-center">{topic.topic}</h2>
      </Link>
    ))
)

const TopicsPage= () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Topics</h2>
    <div className="block p-2 mb-4 bg-white rounded-lg shadow-md flex">
      <CirclePlus className='inline'/>
      <input
        type="text"
        className='inline focus:outline-none float-right'
        placeholder='Search...'  
        />
      <Search className='inline float-right'/>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      <Topic />
    </div>
  </div>
);

export default TopicsPage;
