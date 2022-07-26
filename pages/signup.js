import React from 'react'

import { useRouter } from "next/router";
import { useReward } from 'react-rewards';
import { supabase } from '../utils/supabaseClient'

import Link from 'next/link';
import Button from '../lib/button-component/Button';
import StaticScreen from '../lib/scene-component/StaticScreen';
import AlignItems from '../lib/style-component/AlignItems';
import { FiLogIn } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const { reward, isAnimating } = useReward('rewardId', 'confetti', {
    lifetime:500,
    spread:180,
    elementCount:200
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      await supabase.auth.signIn({
        provider: 'google',
      })
      reward();
  }
  const user = supabase.auth.user();
  user && router.push('/');


  return (
    <>
      {user ?
        <StaticScreen type="loggedIn"/>:
        <AlignItems center={true} className={'fadeIn centerAll'}>
          <div className="loginContainer">
            <h2>Getting Started</h2>
            <h3>
              簡単に始める
            </h3>
            <p>
              Prattle（プラトル）をお試しいただき、ありがとうございます。プラトルは、あなたのランダムな考えを書き留めることができるウェブベースのプラットフォームです。デジタル日記やスクラップブックのようなものと考えてください。ちなみに、オープンソースです！
              <ol>
                <li>アカウントを作成</li>
                <li>ルーム（部屋）を作成</li>
                <li>思いついたことやアイデアを書き留める</li>
                <li>家族や友達に共有しよう！</li>
              </ol>
            </p>
            <Button
              onClick={handleSubmit}
              solid
            >
              <AlignItems>
                <FiLogIn/>
                <span>
                  Googleでログイン
                </span>
              </AlignItems>
            </Button>
          </div>
        </AlignItems>
      }
    </>
  )
}