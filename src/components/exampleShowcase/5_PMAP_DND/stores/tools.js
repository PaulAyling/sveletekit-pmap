import {cardLayout} from './cardLayout'	
import { get } from 'svelte/store';

// UTILS
const getParentId = (childId) =>{
	const findId = (id,myarr)=>{
	let res
	for (let i = 0; i < myarr.length; i++) {
		if(myarr[i].id == id ) return true
		}
	return false
	}
	const snapshot=get(cardLayout)
	for (const key in snapshot) {
  	let nodeArr = snapshot[key].items
		if(findId(childId,nodeArr) == true) {
			return key
		}
	}
}



console.log('getParentId',getParentId(6))






//UPDATES
export const remove = (cardId) =>{
	// 1. Remove child from items
		// Get parentId
		// Remove item from child

	// 2. Remove child from cardLayout

	// Remove from Hierachy
	const parentId = getParentId(cardId,$cardLayout)
	console.log('parentId',parentId)

		console.log('remove running.......',cardId)
		cardLayout.update(val=> 
		{	delete val[cardId];
			console.log(val)
		})
	}


	export const add = (cardIx,newChildCard) => { 
    cardLayout.update(val => {        
        const newChildren= [...val[cardIx].children, newChildCard]
        const newCard = {
					...val[cardIx],
					'children':newChildren}														
        val[cardIx] = newCard
        return val
    })
}	

// DRAG DROP METHODS
	export const dragStart=(event, parentId, draggedCardIx) =>{  //called in droppable.svelte
		//  draggedCardIx = Index of card to be dragged.   (within the children array [])
		//	ParentId  		= ID of parent of array that the card to be dragged belongs
		console.log('dragStart()','parentIx:',parentId, 'draggedCardIx:',draggedCardIx) 
		const data = {parentId, draggedCardIx};
   	event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
export const drop =(event, newParentId) =>{
		//  newParentId  	= ID    of parent of array that the card is dragged to  
		//0.1 Load in data
		console.log('drop()','newParentId:',newParentId)
		event.preventDefault();
  		const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);
	
		//1. Get Item		
		const snapshot=get(cardLayout)
 		const draggedCardId = snapshot[data.parentId].children[data.draggedCardIx]
		console.log('draggedCardId',draggedCardId)  //works to here

    //2. remove the item from the starting postion and put into a variable
		remove(data.parentId,data.draggedCardIx)
		console.log('remove ran')

		//3. Take variable and push it to the destination
		add(newParentId,draggedCardId)
	
			//3. Finalize process //don't seem to need this- not sure why
// 		$cardLayout = $cardLayout; // required to finalize any changes
// 		pointerOverCard = null;
}


	