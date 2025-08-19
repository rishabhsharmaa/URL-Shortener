import React ,{useState}from 'react';

const HomePage = ()=>{
    const [longUrl,setLongUrl]= useState('');
    const handleSubmit = (e) =>{
        //prevents from reloading
        e.preventDefault();
        console.log('url to be shortened : ',longUrl);
    };


    return(
        <div>
            <h1>URL SHORTENER</h1>
            <p>Enter The Long Url To Make It Short And Easy To Share </p>
           
             <form onSubmit={handleSubmit}>

                <div>
                <label htmlFor='longUrl-Input'></label>
                <input
                id='longUrl-Input'
                type='url'
                placeholder='https://example.com/long/url/shorten'
                value={longUrl}
                onChange={(e)=>setLongUrl(e.targetl.value)}
                required/>
                
                </div>
                <button onSubmit={handleSubmit}>Shorten</button>
            </form>
           
        </div>
        
    );
};

export default HomePage;