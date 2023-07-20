
"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useEffect, useState} from 'react'


export default function Home() {
  const [product, setproduct] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProdcuts=async()=>{
      const response =await fetch('/api/product')
      let rjson=await response.json()
      setProducts(rjson.products)
    }

    fetchProdcuts()
   
  }, [])
  



  const addProduct = async(e)=>{
    e.preventDefault();

    try{
      const response = await fetch('/api/product', {
        method: 'POST',
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(product)
      });

      if(response.ok){
        console.log('Product added');

      }
      else{
        console.error('Error');
      }
    }
    catch(error){
      console.error('Error:',error);
    }


  };


  const handleChange =(e)=>{
    setproduct({...product, [e.target.name]:[e.target.value]})
  }
  return (
    <>
    <Header></Header>



    <div className='container bg-[#6366f1] mx-auto max-w-4xl rounded'>
      <h1 className='text-2xl font-semibold mb-4 ml-5 mt-6'>Add Products</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='productname' className='block mb-2 ml-5'>Product Name</label>
          <input name='prdct' onChange={handleChange} id='pname' type='text' className='w-96 ml-5 border border-gray-300 px-2 py-2 rounded'></input>
        </div>
        <div className='mb-4'>
        <label htmlFor='quantity' className='block mb-2 ml-5'>Quantity</label>
        <input name='quantity' onChange={handleChange} id='qty' type='number' className='w-96 ml-5 border border-gray-300 px-2 py-2 rounded'></input>
        </div>
        <div className='mb-4'>
        <label htmlFor='price' className='block mb-2 ml-5'>Price</label>
        <input name='price' onChange={handleChange} id='price' type='number' className='w-96 ml-5 border border-gray-300 px-2 py-2 rounded'></input>
        </div>
        <button  onClick={addProduct} type='submit' className='bg-pink-600 px-4 py-2 text-white ml-5 rounded mb-4 mt-4 w-40'>Add Product</button>
      </form>

    </div>


    <div className='container bg-pink-600 mx-auto max-w-4xl rounded my-7'>
        <h1 className='text-2xl font-semibold mb-4 ml-5'> Available Products</h1>
        <table className='table-auto w-full my-5'>
          <thead className='bg-[#6366f1]'>
            <tr>
              <th className='border border-black px-4 py-2'>Product Name</th>
              <th className='border border-black px-4 py-2'>Quantity</th>
              <th className='border border-black px-4 py-2'>Price</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product=>{
              return <tr key={product.prdct}>
              <td className='border border-black px-4 py-2 text-center'>{product.prdct}</td>
              <td className='border border-black px-4 py-2 text-center'>{product.quantity}</td>
              <td className='border border-black px-4 py-2 text-center'>₹{product.price}</td>
            </tr>
            })}
            
            </tbody>
          

        </table>
    </div>
    </>
  )
}
