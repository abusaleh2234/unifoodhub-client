import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FoodCard from '../../../Component/FoodCard/FoodCard';
import useMeals from '../../../Hook/UseMeals/useMeals';

const Categorytab = () => {

    const categories = ["Breakfast", "Lunch", "Dinner"]
    const [meals] = useMeals()
    // const [tabctg, setTabctg] = useState("")
    const [perCtg, setPerCtg] = useState([])

    

    const hendelTabs = (cotegory) => {
        console.log(cotegory);

        const eachcategory = meals.filter(meal => meal.category === cotegory)
        setPerCtg(eachcategory);
    }
    console.log(meals);
    // console.log(tabctg);
    return (
        <Tabs>
            <TabList>
                <Tab> All Meals</Tab>
                {
                    categories.map((cotegory, index) => <Tab  key={index} onClick={() => hendelTabs(cotegory)} >{cotegory}</Tab>)
                }
            </TabList>

            <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        meals.map(meal => <FoodCard key={meal.name} meal={meal}></FoodCard>)
                    }
                </div>
            </TabPanel>
            <TabPanel>
                <h2 className='text-4xl font-semibold text-center pb-8'>Our Breakfast Meals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        perCtg.map(meal => <FoodCard key={meal.name} meal={meal}></FoodCard>)
                    }
                </div>
            </TabPanel>
            <TabPanel>
            <h2 className='text-4xl font-semibold text-center pb-8'>Our Lunch Meals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        perCtg.map(meal => <FoodCard key={meal.name} meal={meal}></FoodCard>)
                    }
                </div>
            </TabPanel>
            <TabPanel>
            <h2 className='text-4xl font-semibold text-center pb-8'>Our Dinner Meals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        perCtg.map(meal => <FoodCard key={meal.name} meal={meal}></FoodCard>)
                    }
                </div>
            </TabPanel>
        </Tabs>
    );
};

export default Categorytab;