import './BestRecipes.css'
import './ResponsiveRecipes.css'
import { RecipePost } from './Post/RecipePost'

import business from '../../../src/assets/business.jpeg';
import individuals from '../../../src/assets/individuals.jpeg';
import onlineSellers from '../../../src/assets/online sellers.jpeg';
import resellers from '../../../src/assets/resellers.jpeg';

export const BestRecipes = () => {
    return (
        <section className="bRecipes">
            <div className="recipes">
                <div className="infos">
                    <h2>Who We Work For</h2>
                    {/* <p>Far far away, behind the word mountains, far from the countries Vakalia and Consonantia, there live the blind texts</p> */}
                </div>
                
                <div className="recipe-posts">
                    <RecipePost title='Small, Medium, Large Scale Business' 
                    src={business}
                    alt='Small, Medium, Large Scale Business'/>

                    <RecipePost title='Individuals'
                    src={individuals}
                    alt='Individuals'/>

                    <RecipePost title='Online Sellers'
                    src={onlineSellers}
                    alt='Online Sellers'/>

                    <RecipePost title='Resellers'
                    src={resellers}
                    alt='Resellers'/>
                </div>
            </div>
        </section>
    )
}