<?php

namespace App\Exceptions;

// Use Exception;
Use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Arr;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Throwable $exception) // <-- USE Throwable HERE
    {
        parent::report($exception);
    }


    // public function report(Exception $exception)
    // {
    //     parent::report($exception);
    // }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        if ($this->isHttpException($exception)) {
            if ($exception->getStatusCode() == 404) {
                return response()->view('coder.' . 'userpanel.' . 'system.' . '404', [], 404);
            }
             
            if ($exception->getStatusCode() == 500) {
                return response()->view('coder.' . 'userpanel.' . 'system.' . '500', [], 500);
            }
            if ($exception instanceof TestingHttpException) {
            return response()->view('coder.userpanel.system.500');
            }
        
        }
     
        return parent::render($request, $exception);
    }
    

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if($request->expectsJson()){
            return response()->json(['error'=> 'Unauthenticated.'], 401);
        }
        $guard = Arr::get($exception->guards(), 0);
    
        switch ($guard){
            case 'admin':
            $login = 'admin';
            break;

            default:
            $login = 'login';
            break;
        }
        return redirect()->guest(route($login));
    }
}
