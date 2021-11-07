import asyncio
from asyncio.tasks import sleep



def main():
    print('main')
    task = asyncio.create_task(second()) 
    print('third')

async def second():
    
    for num in range(500):
        print(num)

main()
